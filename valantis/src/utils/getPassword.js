import md5 from 'crypto-js/md5';

export default function getPassword() {
    const password = 'Valantis';
    const now = new Date();
    const passString =
        password +
        '_' +
        now.getUTCFullYear() +
        String(now.getUTCMonth() + 1).padStart(2, '0') +
        String(now.getUTCDate()).padStart(2, '0');
    return md5(passString).toString();
}
