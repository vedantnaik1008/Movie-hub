import { memo } from "react";

type Props = {
    title: string;
};

const Heading = memo(({ title }: Props) => {
    console.log('heading rendered');
    
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
});

export default Heading;
