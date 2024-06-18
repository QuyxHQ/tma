import { format, parseISO } from 'date-fns';
import { enUS } from 'date-fns/locale';

type truncateAddressProps = {
    address: string;
    suffixLength?: number;
    prefixLength?: number;
};

export function getAvatar(pfp: string | null, username: string) {
    if (pfp) return pfp;
    return `https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=${username}`;
}

export function truncateAddress(props: truncateAddressProps) {
    if (!props.address) return 'null';

    if (!props.prefixLength) props.prefixLength = 5;
    if (!props.suffixLength) props.suffixLength = 4;

    if (props.address.length <= props.prefixLength + props.suffixLength) return props.address;

    const prefix = props.address.slice(0, props.prefixLength);
    const suffix = props.address.slice(-props.suffixLength);
    const truncated = `${prefix}....${suffix}`;

    return truncated;
}

export function getHumanReadableDateTIme(date: string) {
    return format(parseISO(date), "EEEE do MMMM, yyyy 'at' h:mma", {
        locale: enUS,
    });
}
