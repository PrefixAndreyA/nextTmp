import parse from 'html-react-parser';

const BeforeHead = (props) => {
    return props.options.before_head ? parse(props.options.before_head) : parse('<meta name="fetch" content="fail">');
};

export default BeforeHead;