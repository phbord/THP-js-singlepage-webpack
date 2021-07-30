import linux from '../svg/linux.svg';
import mobile from '../svg/mobile.svg';
import ps4 from '../svg/ps4.svg';
import search from '../svg/search.svg';
import nintendo from '../svg/switch.svg';
import windows from '../svg/windows.svg';
import xbox from '../svg/xbox.svg';
import mac from '../svg/mac.svg';

class Components {

    constructor() {
        this.fileNames = {
            'linux': linux,
            'mobile': mobile,
            'playstation': ps4,
            'psp': ps4,
            'search': search,
            'nintendo': nintendo,
            'game-boy': nintendo,
            'snes': nintendo,
            'pc': windows,
            'web': windows,
            'xbox': xbox,
            'mac': mac,
            'ios': mac,
        };
    }

    svgComponent(file) {
        let keys = Object.keys(this.fileNames)
        for (let i = 0; i < keys.length; i++) {
            if (file.includes(keys[i])){
                return this.fileNames[keys[i]];
            }
        }
    }
}

export default Components;