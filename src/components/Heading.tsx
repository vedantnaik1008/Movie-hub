

type Props = {
    title: string;
};

const Heading = ({ title }: Props) => {
    return (
        <>
            <div className='container'>
                <div className='row pt-3 pb-2'>
                    <div className='col-12 mt-2 mb-4 fs-1 fw-bold text-white text-decoration-underline head d-flex justify-content-center align-items-center h4-title'>
                        <h4 className='fs-1 text-white fw-800 sub-title'>
                            {title}
                        </h4>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Heading;
