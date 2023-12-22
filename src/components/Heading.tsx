

type Props = {
    title: string;
};

const Heading = ({ title }: Props) => {
    return (
        <>
            <div className='heading-container'>
                    <div className='heading-title'>
                        <h4 className=''>
                            {title}
                        </h4>
                    </div>
            </div>
        </>
    );
};

export default Heading;
