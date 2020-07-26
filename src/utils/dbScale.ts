import { finiteTest } from "./logScale";

export const getDBScale = (normValue: number): number => {
    const r = 20 * Math.log10(normValue);
    return finiteTest(r);
}

export const getNormDBScale = (dbValue: number): number => {
    let r = Math.exp(Math.log(10.) * dbValue / 20.); 
    if(isFinite(r)){
        return r;
    }else{
        return 0;
    }
    return finiteTest(r);    
}

// const getDBScale = (normValue: number): string => {
//     if (normValue > 0.0001) {
//         return 20 * Math.log10(normValue) + " dB";
//     } else {
//       return "-∞ dB";
//     }
// }

// if (normValue > 0.0001)
// 	{
// 		sprintf (text, "%.2f", 20 * log10f ((float)normValue));
// 	}
// 	else
// 	{
// 		strcpy (text, "-oo");
// 	}

// bool GainParameter::fromString (const TChar* string, ParamValue& normValue) const
// {
// 	String wrapper ((TChar*)string); // don't know buffer size here!
// 	double tmp = 0.0;
// 	if (wrapper.scanFloat (tmp))
// 	{
// 		// allow only values between -oo and 0dB
// 		if (tmp > 0.0)
// 		{
// 			tmp = -tmp;
// 		}

// 		normValue = expf (logf (10.f) * (float)tmp / 20.f);
// 		return true;
// 	}
// 	return false;
// }