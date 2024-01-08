export const getColorClass = (voteAverage: number | undefined) => {
    if (voteAverage !== undefined && voteAverage >= 7.9) {
        return 'green';
    } else if (voteAverage !== undefined && voteAverage >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
};
