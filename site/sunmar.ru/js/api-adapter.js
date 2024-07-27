function endpointUrl(endpoint) {
    const host = location.hostname === 'localhost' ? 'http://localhost:8010/proxy' : location.hostname.replace('www', 'b2capi');
    return host + endpoint;
}

export async function fetchArrivalLocation(keyword, type) {
    const endpoint = endpointUrl('/OnlyHotelProduct/ListArrivalLocations');
    const query = { text: keyword };
    if (type !== undefined) {
        query.locationTypes = [Number(type)];
    }
    let { result: { locations } } = await fetch(endpoint, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(query)
    }).then(response => response.json());

    if (locations?.length) {
        // if (type !== undefined) {
        //     locations = locations.filter(loc => loc.type === Number(type));
        // }
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

export async function fetchOffersListLink(query) {
    const response_json = await fetch(endpointUrl('/OnlyHotelProduct/PriceSearchEncrypt'), {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(query),
    }).then(response => response.json());
    return response_json.result;
}