import parse from 'html-react-parser';

const BeforeBody = (props) => {
    return props.options.before_body ? parse(props.options.before_body) : parse('<meta name="fetch" content="fail">');
};

export default BeforeBody;