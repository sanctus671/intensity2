import { Injectable, Pipe, PipeTransform } from '@angular/core';

    
@Pipe({
    name: 'exerciseSearch'
})
@Injectable()
export class ExerciseSearchPipe implements PipeTransform {
    transform(items: any[], term:string): any {
        let returnItems = items.filter(item => item.name.toLowerCase().indexOf(term.toLowerCase()) !== -1);

        return returnItems;
    }
}