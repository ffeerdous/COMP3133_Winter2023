import { Component } from "@angular/core";

@Component({
    selector: 'students',
    template: `
        <h2> {{ getTitle() }}</h2>
        <p> Current date: {{ getCurrentDate() }}</p>
    `
})

export class StudentsComponent {
    title = "My list of Students"
    currentDate: Date = new Date()

    getTitle(){
        return this.title;
    }

    getCurrentDate(){
        return this.currentDate;
    }
}