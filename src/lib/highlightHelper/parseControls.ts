export const parseControls = (schema: Record<string, string>) => {
    const result: Record<string, string | string[]> = {} 
    for(const key in schema){
        const entry = schema[key];
        if(arrayControlPattern.test(key)){
            const [k, idx] = key.split('.');
            if(!result[k]){
                result[k] = [];
            }

            result[k][idx] = entry;
            continue;
        }
        result[key] = entry;
    }

    return result;
}

const arrayControlPattern = /\w+\.\d+/