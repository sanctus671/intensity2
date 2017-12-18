import { Pipe } from "@angular/core";

@Pipe({
  name: "sort"
})
export class ArraySortPipe {
    transform(array: any[], field: string): any[] {
        array.sort((a: any, b: any) => {
            if (field === "id"){
                a = parseInt(a[field]);b = parseInt(b[field]);
            }
            else{
                a = a[field].toLowerCase();
                b = b[field].toLowerCase();
            }


            if (a < b) {
                return -1;
            } else if (a > b) {
                return 1;
            } else {
                return 0;
            }
        });
        
        return array;
    }
}