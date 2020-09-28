import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';


export function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}



export function catchFormError(form): any {
  // @ts-ignore
  return catchError((err: any) => {
    Object.keys(err.error).forEach(key => {
      const value = err.error[key];
      const errorDict = {};
      for (const item of value) {
        errorDict[item] = {message: item};
      }
      if (form.controls[key]) {
        form.controls[key].setErrors(errorDict);
      }
    });
    return throwError(err);
  });
}
