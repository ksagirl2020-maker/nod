import { getSheet } from "../api/api.js";

(async () => {

    const profile = await getSheet("01_الملف_الشخصي");

    console.log(profile);

})();