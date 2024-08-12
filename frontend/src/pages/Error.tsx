interface Prop {
    message: string;
}

const Error = ({ message }: Prop) => {
    return (
        <div className="h-screen bg-black flex justify-center items-center">
            <h1 className="font-bold text-gray-500 text-3xl">{message}</h1>
        </div>
    );
};

export default Error;
