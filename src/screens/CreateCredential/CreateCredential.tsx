//@ts-nocheck
import React, { useRef, useState } from 'react';
import useForm from '../../hooks/useForm';
import useApi from '../../hooks/useApi';
import { CustomMainButton, Loader } from '../../components';
import { useQuery } from '@tanstack/react-query';
import useApp from '../../hooks/useApp';
import { Camera, HourGlass, Plus } from '../../icons';
import Edit from '../../icons/all/Edit';
import Trash from '../../icons/all/Trash';
import toast from '../../shared/toast';
import { useNavigate } from 'react-router-dom';
import useModal from '../../hooks/useModal';

interface FormData {
    label: string;
    type: string;
    value: string;
}

interface EditModalProps {
    index: number;
    input: FormData[];
    setInput: React.Dispatch<React.SetStateAction<FormData[]>>;
    closeModal: () => void;
}

interface DeleteModalProps {
    index: number;
    setInput: React.Dispatch<React.SetStateAction<FormData[]>>;
    closeModal: () => void;
}

const TestModal: React.FC<{
    setInput: React.Dispatch<React.SetStateAction<FormData[]>>;
    closeModal: () => void;
}> = ({ setInput, closeModal }) => {
    const [formData, setFormData] = useState<FormData>({ label: '', type: '', value: '' });
    const [inputError, setInputError] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.label.toLowerCase() === 'username') {
            setInputError(true);
            return;
        }
        setInput((prev) => [...prev, formData]);
        closeModal();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === 'label' && value.toLowerCase() === 'username') {
            setInputError(true);
        } else {
            setInputError(false);
        }
    };

    return (
        <div className="col-12">
            <form onSubmit={handleSubmit}>
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
                    {inputError && (
                        <span className="error-message">Label cannot be "username"</span>
                    )}
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
                    <CustomMainButton type="submit" disabled={inputError}>
                        Add
                    </CustomMainButton>
                </div>
            </form>
        </div>
    );
};

const EditModal: React.FC<EditModalProps> = ({ index, input, setInput, closeModal }) => {
    const [formData, setFormData] = useState<FormData>(input[index]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newInput = [...input];
        newInput[index] = formData;
        setInput(newInput);
        closeModal();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        // Remove trailing colon if present in the name
        const cleanedName = name.replace(/:$/, '');
        setFormData((prev) => ({ ...prev, [cleanedName]: value }));
    };

    return (
        <div className="col-12">
            <form onSubmit={handleSubmit}>
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
                    <CustomMainButton type="submit">Edit</CustomMainButton>
                </div>
            </form>
        </div>
    );
};

const DeleteModal: React.FC<DeleteModalProps> = ({ index, setInput, closeModal }) => {
    const handleDelete = () => {
        setInput((prev) => prev.filter((_, i) => i !== index));
        closeModal();
    };

    return (
        <div className="col-12">
            <p>Are you sure you want to delete this item?</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <CustomMainButton handleClick={handleDelete}>Delete</CustomMainButton>
                <CustomMainButton handleClick={closeModal}>Cancel</CustomMainButton>
            </div>
        </div>
    );
};

const CreateCredential: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pfp, setPfp] = useState<string>();
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const { onChange, onSubmit, values } = useForm(create, { username: '', bio: '' });
    const { user: whoami } = useApp();
    const navigate = useNavigate();
    const { openModal, setModalBody, closeModal, setTitle } = useModal();

    const [input, setInput] = useState<FormData[]>([
        { label: 'FirstName', type: 'text', value: 'Morifeoluwa' },
        { label: 'UserName', type: 'text', value: 'NerdyDev' },
    ]);

    const fileRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => setPfp(e.target?.result as string);
        reader.readAsDataURL(file);
    };

    const { isPending, data: username } = useQuery({
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

    const openTestModal = () => {
        setTitle('Add Field');
        setModalBody(<TestModal setInput={setInput} closeModal={closeModal} />);
        openModal();
    };

    const openEditModal = (index: number) => {
        setTitle('Edit Field');
        setModalBody(
            <EditModal index={index} input={input} setInput={setInput} closeModal={closeModal} />
        );
        openModal();
    };

    const openDeleteModal = (index: number) => {
        setTitle('Delete Field');
        setModalBody(<DeleteModal index={index} setInput={setInput} closeModal={closeModal} />);
        openModal();
    };

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
                    <div className="group-custom">
                        <div className="no-data mb-3">
                            <HourGlass size={45} />
                            <p>Coming soon, check back later :-)</p>
                        </div>

                        {/* {input.map((item, index) => (
                            <div className="Group" key={index}>
                                <p>{item.label}: </p>
                                <div className="custom-Info">
                                    <span>{item.value}</span>
                                    <div className="icons">
                                        <Edit handleClick={() => openEditModal(index)} />
                                        <Trash handleClick={() => openDeleteModal(index)} />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="group_button">
                            <button className="addbutton" onClick={openTestModal}>
                                Add
                                <Plus />
                            </button>
                        </div> */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateCredential;
