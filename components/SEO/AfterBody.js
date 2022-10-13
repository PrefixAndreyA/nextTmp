import parse from 'html-react-parser';

const AfterBody = (props) => {
    return props.options.after_body ? parse(props.options.after_body) : parse('<meta name="fetch" content="fail">');
};

export default AfterBody;