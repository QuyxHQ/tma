import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useApp from '../../../hooks/useApp';
import useModal from '../../../hooks/useModal';
import useApi from '../../../hooks/useApi';
import { CustomMainButton, Loader } from '../../../components';

type Props = {
    setCustomBuilder: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    customBuilder: Record<string, string>;
    identifier: string;
};

const EditCustomEntry: React.FC<Props> = ({ setCustomBuilder, customBuilder, identifier }) => {
    const [selectedType, setSelectedType] = useState<'text' | 'image' | 'username'>('text');
    const { closeModal } = useModal();
    const { user: whoami } = useApp();

    const [value, setValue] = useState<string>('');

    async function handleSubmit(e: any) {
        e.preventDefault();
        if (!value) return;

        setCustomBuilder((prev) => ({
            ...prev,
            [identifier]: value,
        }));

        closeModal();
    }

    useEffect(() => {
        if (!customBuilder || Object.keys(customBuilder).length === 0) return;

        if (identifier === 'username') {
            setSelectedType('username');
            setValue(customBuilder[identifier]);
        } else if (customBuilder[identifier].startsWith('data:image/')) {
            setSelectedType('image');
        } else {
            setValue(customBuilder[identifier]);
            setSelectedType('text');
        }
    }, [identifier, customBuilder]);

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
                    <label
                        htmlFor="value"
                        className="d-flex align-items-center mb-2"
                        style={{ gap: '0.9rem' }}
                    >
                        <span className="title-case">{identifier.split('_').join(' ')}</span>
                        {isPending ? <Loader size={15} /> : null}
                    </label>

                    <div className="pt-1">
                        {selectedType === 'text' ? (
                            <input
                                className="basic-input"
                                id="value"
                                name="value"
                                type="text"
                                onChange={(e) => setValue(e.target.value)}
                                value={value}
                                placeholder={`enter value for ${identifier.split('_').join(' ')}`}
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
                </div>
            </div>

            <div style={{ margin: '-1rem' }}>
                <CustomMainButton type="submit">Save changes</CustomMainButton>
            </div>
        </form>
    );
};

export default EditCustomEntry;
