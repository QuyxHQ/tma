import React, { useRef, useState } from 'react';
import useForm from '../../hooks/useForm';
import useApi from '../../hooks/useApi';
import { CustomMainButton, Loader } from '../../components';
import { useQuery } from '@tanstack/react-query';
import useApp from '../../hooks/useApp';
import { Camera, Edit, Plus, Trash, MoodPuzzled } from '../../icons';
import toast from '../../shared/toast';
import { useNavigate } from 'react-router-dom';
import useModal from '../../hooks/useModal';
import { omit } from 'lodash';
import NewCustomEntry from './components/NewCustomEntry';
import EditCustomEntry from './components/EditCustomEntry';

const CreateCredential: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pfp, setPfp] = useState<string>();
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const { onChange, onSubmit, values } = useForm(create, { username: '', bio: '' });
    const { user: whoami } = useApp();
    const navigate = useNavigate();
    const { openModal, setModalBody, setTitle } = useModal();
    const [customBuiler, setCustomBuilder] = useState<Record<string, string>>({});

    const fileRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => setPfp(e.target?.result as string);
        reader.readAsDataURL(file);
    };

    const { isPending, data: usernames } = useQuery({
        queryKey: ['nfts'],
        queryFn: async () => {
            const { user } = await useApi();
            const nfts = await user.getUserNfts(whoami?.address!, 1, 1000);
            return nfts.map((item) => item.nft.metadata.name);
        },
    });

    async function create() {
        if (isLoading || !whoami) return;
        setIsLoading(true);

        if (!pfp || !values.username || !values.bio) {
            toast({
                type: 'error',
                message: 'Required fields are missing!',
            });

            return setIsLoading(false);
        }

        const { identity, misc } = await useApi();
        const url = await misc.uploadImage(pfp);

        if (await identity.issueVC({ url, ...values })) {
            navigate('/', {
                state: { should_refresh: true },
            });
        }

        setIsLoading(false);
    }

    async function createCustomCredential(data: Record<string, any>) {
        if (isLoading || !whoami || Object.keys(data).length === 0) return;
        setIsLoading(true);

        const expires = data.expires ? new Date(data.expires).getTime() : undefined;

        data = omit(data, 'expires');

        const { misc, identity } = await useApi();

        for (const key in data) {
            if (data[key].startsWith('data:image/')) {
                const url = await misc.uploadImage(data[key]);
                if (!url) {
                    toast({ type: 'error', message: 'Could not upload image' });
                    setIsLoading(false);

                    return;
                }

                data[key] = url;
            }
        }

        if (await identity.issueVC({ ...data }, expires)) {
            navigate('/', {
                state: { should_refresh: true },
            });
        }

        setIsLoading(false);
    }

    function openAddCustomEntryModal() {
        setModalBody(<NewCustomEntry setCustomBuilder={setCustomBuilder} />);
        setTitle('Add entry');
        openModal();
    }

    function deleteEntry(key: string) {
        setCustomBuilder((prev) => {
            const state = { ...prev };
            delete state[key];

            return state;
        });
    }

    function openEditEntryModal(key: string) {
        setModalBody(
            <EditCustomEntry
                setCustomBuilder={setCustomBuilder}
                customBuilder={customBuiler}
                identifier={key}
            />
        );

        setTitle('Edit entry');
        openModal();
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 mb-4">
                    <div className="title">
                        <h1>Create Credential</h1>
                        <p>Create a credential off your Quyx username</p>
                    </div>
                </div>

                <div className="tab mb-4">
                    <p
                        className={selectedIndex === 0 ? 'active' : ''}
                        onClick={() => setSelectedIndex(0)}
                    >
                        Default
                    </p>
                    <p
                        className={selectedIndex === 1 ? 'active' : ''}
                        onClick={() => setSelectedIndex(1)}
                    >
                        Custom
                    </p>
                </div>

                {selectedIndex === 0 && (
                    <div className="col-12">
                        <form action="#" onSubmit={onSubmit}>
                            <div className="form-group mb-4 image-form">
                                <div className="position-relative">
                                    <img
                                        src={pfp ? pfp : '/images/user.png'}
                                        alt={whoami?.username}
                                    />
                                    <div
                                        className="position-absolute"
                                        onClick={() => fileRef.current?.click()}
                                    >
                                        <Camera size={18} />
                                        <input
                                            className="d-none"
                                            type="file"
                                            accept="image/*"
                                            name="image"
                                            onChange={handleImageChange}
                                            ref={fileRef}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group mb-4">
                                <label
                                    htmlFor="username"
                                    className="d-flex align-items-center"
                                    style={{ gap: '0.9rem' }}
                                >
                                    <span>Username</span>
                                    {isPending ? <Loader size={15} /> : null}
                                </label>

                                <select
                                    name="username"
                                    id="username"
                                    className="basic-input"
                                    defaultValue={values.username}
                                    onChange={onChange}
                                    required
                                >
                                    <option value="" disabled>
                                        --select a username--
                                    </option>

                                    {usernames?.map((username) => (
                                        <option value={username} key={username}>
                                            {username}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group mb-4">
                                <label htmlFor="bio">Short bio</label>
                                <textarea
                                    name="bio"
                                    id="bio"
                                    rows={7}
                                    className="basic-input"
                                    onChange={onChange}
                                    value={values.bio}
                                    placeholder="e.g. I love Quyx so much"
                                />
                            </div>

                            <div style={{ margin: '-1rem' }}>
                                <CustomMainButton isLoading={isLoading} type="submit">
                                    Create
                                </CustomMainButton>
                            </div>
                        </form>
                    </div>
                )}

                {selectedIndex === 1 && (
                    <div className="group-custom">
                        <div className="col-12">
                            <form
                                action="#"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    createCustomCredential(customBuiler);
                                }}
                            >
                                {Object.keys(customBuiler).length == 0 ? (
                                    <div className="empty-creed mb-4">
                                        <MoodPuzzled size={45} className="mb-1" />
                                        <h3>Confused?</h3>
                                        <p>
                                            Click on the button below to add entries and start
                                            building your credential
                                        </p>

                                        <button type="button" onClick={openAddCustomEntryModal}>
                                            <span>Add entry</span>
                                            <Plus size={22} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="mb-4 builder-div">
                                        <div>
                                            {Object.keys(customBuiler).map((item, i) => (
                                                <div
                                                    className="d-flex single justify-content-between"
                                                    key={`custom-entry-${i}`}
                                                >
                                                    <div className="w-100">
                                                        <h4 className="title-case">
                                                            {item.split('_').join(' ')}
                                                        </h4>

                                                        <p>
                                                            {customBuiler[item].startsWith(
                                                                'data:image/'
                                                            ) ? (
                                                                <img src={customBuiler[item]} />
                                                            ) : (
                                                                customBuiler[item]
                                                            )}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <button
                                                            type="button"
                                                            onClick={() => openEditEntryModal(item)}
                                                        >
                                                            <Edit />
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() => deleteEntry(item)}
                                                        >
                                                            <Trash />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <button onClick={openAddCustomEntryModal} type="button">
                                            <span>Add new entry</span>
                                            <Plus size={22} />
                                        </button>
                                    </div>
                                )}

                                <div style={{ margin: '-1rem' }}>
                                    <CustomMainButton isLoading={isLoading} type="submit">
                                        Create
                                    </CustomMainButton>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateCredential;
