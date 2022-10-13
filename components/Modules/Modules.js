import * as AllModules from "../../modules";

let moduleComponents = [];

const Modules = (props) => {
    let modules = props.modules;

    if (modules) {
        const moduleNames = [];

        modules.forEach((module) => {
            const layout = module.acf_fc_layout;
            const layoutArray = layout.split(/_|-/);
            let pascalCaseModuleName = "";

            layoutArray.forEach((word) => {
                let wordArray = Array.from(word);
                wordArray[0] = wordArray[0].toUpperCase();
                const capitalizedWord = wordArray.join("");
                pascalCaseModuleName += capitalizedWord;
            });

            moduleNames.push(pascalCaseModuleName);
        });

        moduleComponents = [];

        moduleNames.forEach((name, index) => {
            const Module = AllModules[name];

            moduleComponents[index] = (
                <Module
                    key={index}
                    module={modules[index]}
                    titleValue={index < 6 ? index + 1 : 6}
                    forms={props.forms}
                    options={props.options}
                    postData={props.postData}
                    allPostsData={props.allPostsData}
                    allDevelopmentsData={props.allDevelopmentsData}
                    allCareersData={props.allCareersData}
                    cats={props.cats}
                    tags={props.tags}
                    events={props.events}
                />
            );
        });
        return <>{moduleComponents}</>;
    } else {
        return null;
    }
};

export default Modules;
