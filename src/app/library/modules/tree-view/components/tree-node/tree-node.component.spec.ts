import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreeNodeComponent } from './tree-node.component';

describe('TreeNodeComponent', () => {
    let component: TreeNodeComponent<any>;
    let fixture: ComponentFixture<TreeNodeComponent<any>>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [ TreeNodeComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TreeNodeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
