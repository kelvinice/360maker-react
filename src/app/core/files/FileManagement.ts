export default class FileManagement {
    static readSaveFile = () => {
        const filepath = "/data.json";
        fetch(filepath).then(response => response.text()).then(text => {
            console.log(text);
        });
    }
}