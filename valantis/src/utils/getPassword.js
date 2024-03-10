import md5 from 'crypto-js/md5';

export default function getPassword() {
    const now = new Date();
    const passString =
        process.env.REACT_APP_PASSWORD +
        '_' +
        now.getUTCFullYear() +
        String(now.getUTCMonth() + 1).padStart(2, '0') +
        String(now.getUTCDate()).padStart(2, '0');
    return md5(passString).toString();
}
