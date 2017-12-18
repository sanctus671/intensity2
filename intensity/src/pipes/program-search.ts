import { Injectable, Pipe, PipeTransform } from '@angular/core';

    
@Pipe({
    name: 'programSearch'
})
@Injectable()
export class ProgramSearchPipe implements PipeTransform {
    transform(items: any[], term:string): any {
        let returnItems = items.filter(item => item.name.toLowerCase().indexOf(term.toLowerCase()) !== -1);

        return returnItems;
    }
}