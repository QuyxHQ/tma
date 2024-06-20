import React, { useRef, useState } from 'react';
import useForm from '../../hooks/useForm';
import useApi from '../../hooks/useApi';
import { CustomMainButton, Loader } from '../../components';
import { useQuery } from '@tanstack/react-query';
import useApp from '../../hooks/useApp';
import { Camera } from '../../icons';
import toast from '../../shared/toast';
import { useNavigate } from 'react-router-dom';

const CreateCredential: React.FC<{}> = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pfp, setPfp] = useState<string>();
    const { onChange, onSubmit, values } = useForm(create, { username: '', bio: '' });
    const { user: whoami } = useApp();
    const navigate = useNavigate();

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
        queryFn: async function () {
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
                state: {
                    should_refresh: true,
                },
            });
        }

        setIsLoading(false);
    }

    return (
        <div className="main-body pb-4">
            <div className="container">
                <div className="row">
                    <div className="col-12 mb-4">
                        <div className="title">
                            <h1>Create Credential</h1>
                            <p>create a credential off your Quyx username</p>
                        </div>
                    </div>

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

                                    <option value="morifeoluwa">morifeoluwa</option>

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
                </div>
            </div>
        </div>
    );
};

export default CreateCredential;
