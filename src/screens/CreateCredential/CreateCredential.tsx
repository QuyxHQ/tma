import React, { useRef, useState } from 'react';
import useForm from '../../hooks/useForm';
import useApi from '../../hooks/useApi';
import { CustomMainButton, Loader } from '../../components';
import { useQuery } from '@tanstack/react-query';
import useApp from '../../hooks/useApp';
import { Camera, Plus } from '../../icons';
import Edit from "../../icons/all/Edit";
import Trash from "../../icons/all/Trash";
import toast from '../../shared/toast';
import { useNavigate } from 'react-router-dom';
import useModal from '../../hooks/useModal';

const TestModal = ({ setInput, closeModal }: { setInput: React.Dispatch<React.SetStateAction<{ label: string; type: string; value: string; }[]>>, closeModal: () => void }) => {
    const [formData, setFormData] = useState<{ label: string; type: string; value: string; }>({ label: '', type: '', value: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setInput(prev => [...prev, formData]);
        closeModal(); // Close the modal after submission
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="col-12">
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                    <label htmlFor="type">Type</label>
                    <select
                        name="type"
                        id="type"
                        className="basic-input"
                        onChange={handleInputChange}
                        value={formData.type}
                        required
                    >
                        <option value="">-- Select type --</option>
                        <option value="text">Text</option>
                        <option value="textarea">Textarea</option>
                        <option value="image">Image</option>
                        <option value="url">URL</option>
                        <option value="checkbox">Checkbox</option>
                        <option value="radio">Radio</option>
                    </select>
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="label">Label</label>
                    <input
                        type="text"
                        name="label"
                        id="label"
                        className="basic-input"
                        onChange={handleInputChange}
                        value={formData.label}
                        placeholder="Label"
                        required
                    />
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="value">Value</label>
                    <input
                        type="text"
                        name="value"
                        id="value"
                        className="basic-input"
                        onChange={handleInputChange}
                        value={formData.value}
                        placeholder="Enter value"
                        required
                    />
                </div>

                <div style={{ margin: '-1rem' }}>
                    <CustomMainButton type="submit">
                        Submit
                    </CustomMainButton>
                </div>
            </form>
        </div>
    );
};

const CreateCredential: React.FC<{}> = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pfp, setPfp] = useState<string>();
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const { onChange, onSubmit, values } = useForm(create, { username: '', bio: '' });
    const { user: whoami } = useApp();
    const navigate = useNavigate();
    const { openModal, setModalBody, closeModal } = useModal();
    
    // Initialize input state with default FirstName and UserName
    const [input, setInput] = useState<{ label: string; type: string; value: string; }[]>([
        { label: 'FirstName', type: 'text', value: 'Morifeoluwa' },
        { label: 'UserName', type: 'text', value: 'NerdyDev' }
    ]);

    const fileRef = useRef<any>();

    function handleImageChange(e: any) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e: any) => setPfp(e.target.result);
        reader.readAsDataURL(file);
    }

    const { isPending, data: username } = useQuery({
        queryKey: ['nfts'],
        queryFn: async () => {
            const { user } = await useApi();
            const nfts = await user.getUserNfts(whoami?.address!, 1, 1000);
            return nfts.map((item) => item.nft.metadata.name) as string[];
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

    // Function to open the modal with TestModal component
    const openTestModal = () => {
        setModalBody(<TestModal setInput={setInput} closeModal={closeModal} />);
        openModal();
    };

    return (
        <div className="main-body pb-4">
            <div className="container">
                <div className="row">
                    <div className="col-12 mb-4">
                        <div className="title">
                            <h1>Create Credential</h1>
                            <p>Create a credential off your Quyx username</p>
                        </div>
                    </div>

                    <div className="tab">
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
                                            onClick={() => fileRef.current.click()}
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

                                        {username?.map((username) => (
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
                        <div className='group-custom'>
                            {input.map((item, index) => (
                                <div key={index} className='custom-Info'>
                                    <p>{item.label}: <span>{item.value}</span> </p>
                                    <div className='icons'>
                                        <Edit />
                                        <Trash />
                                    </div>
                                </div>
                            ))}
                            <div className='group_button'>
                                <CustomMainButton type="button" className="addbutton" handleClick={openTestModal}>
                                    Add
                                    <Plus />
                                </CustomMainButton>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateCredential;

