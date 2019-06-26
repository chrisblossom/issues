import fs from 'fs';
import { promisify } from 'util';

const fsAccess = promisify(fs.access);

async function pathExists(pathname: string): Promise<boolean> {
    try {
        await fsAccess(pathname);

        return true;
    } catch (error) {
        return false;
    }
}

export { pathExists };
