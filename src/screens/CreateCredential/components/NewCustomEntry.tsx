import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CustomMainButton, Loader } from '../../../components';
import { Camera, Input, User } from '../../../icons';
import useModal from '../../../hooks/useModal';
import useApi from '../../../hooks/useApi';
import useApp from '../../../hooks/useApp';

type Props = {
    setCustomBuilder: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

const NewCustomEntry: React.FC<Props> = ({ setCustomBuilder }) => {
    const [selectedType, setSelectedType] = useState<'text' | 'image' | 'username'>('text');
    const { closeModal } = useModal();
    const { user: whoami } = useApp();

    const [label, setLabel] = useState<string>('');
    const [value, setValue] = useState<string>('');

    async function handleSubmit(e: any) {
        e.preventDefault();

        if (!label || !value) return;

        setCustomBuilder((prev) => ({
            ...prev,
            [label.toLowerCase().split(' ').join('_')]: value,
        }));

        setLabel('');
        setValue('');
        setSelectedType('text');

        closeModal();
    }

    const { isPending, data: usernames } = useQuery({
        queryKey: ['nfts'],
        queryFn: async () => {
            const { user } = await useApi();
            const nfts = await user.getUserNfts(whoami?.address!, 1, 1000);
            return nfts.map((item) => item.nft.metadata.name);
        },
    });

    return (
        <form action="#" onSubmit={handleSubmit}>
            <div className="form-group mb-4">
                <div>
                    <label htmlFor="label">Entry Label</label>
                </div>

                <input
                    className="basic-input"
                    id="label"
                    name="label"
                    type="text"
                    onChange={(e) => setLabel(e.target.value)}
                    value={label}
                    placeholder="e.g. First name, Bio, e.t.c."
                    autoComplete="off"
                    required
                />
            </div>

            <div className="form-group mb-4">
                <div className="d-flex align-items-center justify-content-between">
                    <label
                        htmlFor="value"
                        className="pt-2 d-flex align-items-center"
                        style={{ gap: '0.9rem' }}
                    >
                        <span>Value</span>
                        {isPending ? <Loader size={15} /> : null}
                    </label>

                    <div className="d-flex align-items-center pref-switcher">
                        <div
                            className={selectedType === 'text' ? 'active' : ''}
                            onClick={() => setSelectedType('text')}
                        >
                            <Input size={15} />
                        </div>

                        <div
                            className={selectedType === 'image' ? 'active' : ''}
                            onClick={() => setSelectedType('image')}
                        >
                            <Camera size={15} />
                        </div>

                        <div
                            className={selectedType === 'username' ? 'active' : ''}
                            onClick={() => {
                                setSelectedType('username');
                                setLabel('Username');
                            }}
                        >
                            <User size={15} />
                        </div>
                    </div>
                </div>

                {selectedType === 'text' ? (
                    <input
                        className="basic-input"
                        id="value"
                        name="value"
                        type="text"
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                        placeholder={`enter value for ${label.toLowerCase() || 'label'}`}
                        autoComplete="off"
                        required
                    />
                ) : selectedType === 'image' ? (
                    <input
                        className="basic-input"
                        type="file"
                        accept="image/*"
                        onChange={function (e) {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            const reader = new FileReader();
                            reader.onload = (ev: any) => setValue(ev.target.result);
                            reader.readAsDataURL(file);
                        }}
                        id="value"
                        name="value"
                        required
                    />
                ) : (
                    <select
                        name="username"
                        id="username"
                        className="basic-input"
                        defaultValue={usernames?.includes(value) ? value : ''}
                        onChange={(e) => setValue(e.target.value)}
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
                )}
            </div>

            <div className="pt-1" style={{ margin: '-1rem' }}>
                <CustomMainButton type="submit">Add</CustomMainButton>
            </div>
        </form>
    );
};

export default NewCustomEntry;
