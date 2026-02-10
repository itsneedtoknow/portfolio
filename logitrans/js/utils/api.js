export async function LoadJSON(url) {
    let resp = await fetch(url);

    if(resp.status == 200){
        // console.log(resp.json())
        return await resp.json();
    }else{
        throw new Error(`Ошибка загрузки: ${resp.status}`)
    }
}