import React, {FC, useEffect, useState} from 'react';

interface Props {
    apiPath: string;
}

interface DataItem {
    id: number;
    content: string;
}

const View: FC<Props> = ({apiPath}) => {
    const [data, setData] = useState<Array<DataItem>>();

    useEffect(() => {
        fetch(`${apiPath}testdata`)
        .then(response => response.json())
        .then(json => setData(json));
    }, []);

    return (
        <div>
            {data && (data.map(({id, content}) => (
                <p>{id} - {content}</p>
            )))}
        </div>
    );
}

export default View;
