import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <Spinner animation="border" variant="primary" size="lg" />
        </div>
    );
};

export default Loading;