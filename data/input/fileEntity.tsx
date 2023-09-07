export const EntityKomponent = (props) => {
    const [data] = useEntityQuery();
    const db = 'EntityDataBase';
    const handler = 'EntityHandler';
    return data.map(d => <EntityKomponent data={d} />);
}
