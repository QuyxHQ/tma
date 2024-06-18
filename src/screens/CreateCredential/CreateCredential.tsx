import React from 'react';
import useForm from '../../hooks/useForm';
import useApi from '../../hooks/useApi';

const CreateCredential: React.FC<{}> = () => {
    const { onChange, onSubmit, values } = useForm(create, { username: '' });

    async function create() {
        const { identity } = await useApi();

        await identity.issueVC(values, Date.now() + 60 * 5 * 1000);
    }

    return (
        <div className="main-body">
            <h1 className="mb-4 pb-3">Create Credential</h1>

            <form action="#" onSubmit={onSubmit}>
                <input
                    type="text"
                    autoComplete="off"
                    placeholder="e.g "
                    className="basic-input"
                    name="username"
                    id="username"
                    value={values.username}
                    onChange={onChange}
                    required
                />
            </form>
        </div>
    );
};

export default CreateCredential;
