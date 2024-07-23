function endpointUrl(endpoint) {
    const host = location.hostname === 'localhost' ? 'http://localhost:8010/proxy' : location.hostname.replace('www', 'b2capi');
    return host + endpoint;
}

export async function fetchArrivalLocation(keyword, type) {
    const endpoint = endpointUrl('/OnlyHotelProduct/ListArrivalLocations');
    let { result: { locations } } = await fetch(endpoint, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: keyword })
    }).then(response => response.json());

    if (locations?.length) {
        if (type !== undefined) {
            locations = locations.filter(loc => loc.type === Number(type));
        }
        return locations.at(0);
    } else {
        return null;
    }

}

export async function fetchBestOffer(query) {

    const response_json = await fetch(endpointUrl('/OnlyHotelProduct/PriceSearchList'), {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ searchCriterias: query }),
    }).then(response => response.json());
    return response_json.result?.products?.at(0)?.offers?.at(0);

}