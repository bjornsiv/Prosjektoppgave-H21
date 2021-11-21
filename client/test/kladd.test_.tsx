import * as React from 'react';
import { TaskList, TaskNew, TaskDetails, TaskEdit } from '../src/task-components';
import { shallow } from 'enzyme';
import { Form, Button, Card, Row, Column } from '../src/widgets';
import { NavLink } from 'react-router-dom';
import taskService, { Task } from '../src/task-service';
import renderer from 'react-test-renderer';

jest.mock('../src/task-service', () => { //"mock" basically snakker ikke med den ekte serveren, men en magisk server som gjør akuratt det vi trenger istedenfor
  class TaskService {
  
   
    getAll() {
      return Promise.resolve<Task[]>([
        { id: 1, title: 'Les leksjon', done: false, description: "" },
        { id: 2, title: 'Møt opp på forelesning', done: false, description: "" },
        { id: 3, title: 'Gjør øving', done: false, description: "" },
      ]);
    }

    get(id:Number) {
      return new Promise<Task>(
        (resolve, reject) =>
        {
          this.getAll()
          .then(
            (tasks) => {
              var task = tasks.find((task) => task.id == id);
              if (task)
              {
                resolve(task);
              }
              else
              {
                reject("Could not find Task");
              }
            }
          );
        }
      );
    }

    update(task: Task)
    {
      return Promise.resolve();
    }

    create() {
      return Promise.resolve(4); // Same as: return new Promise((resolve) => resolve(4));
    }
  }
  return new TaskService();
}); //mocken slutter her
  
// _________________________________________________________

//Under finner du vanlige JEST tester
describe('Task component tests', () => {
  test('TaskList draws correctly', (done) => {
    const wrapper = shallow(<TaskList />);

    // Wait for events to complete
    setTimeout(() => {
      expect(
        wrapper.containsAllMatchingElements([
          <NavLink to="/tasks/1">Les leksjon</NavLink>,
          <NavLink to="/tasks/2">Møt opp på forelesning</NavLink>,
          <NavLink to="/tasks/3">Gjør øving</NavLink>,
        ])
      ).toEqual(true);
      done();
    });
  });

  test('TaskNew correctly sets location on create', (done) => {
    const wrapper = shallow(<TaskNew />);

    wrapper.find(Form.Input).simulate('change', { currentTarget: { value: 'Kaffepause' } });
    // @ts-ignore
    expect(wrapper.containsMatchingElement(<Form.Input value="Kaffepause" />)).toEqual(true);

    wrapper.find(Button.Success).simulate('click');
    // Wait for events to complete
    setTimeout(() => {
      expect(location.hash).toEqual('#/tasks/4');
      done();
    });
  });

  test('TaskDetails renders correctly according to containsAllMatchingElements', (done) => {
    const wrapper = shallow(<TaskDetails match={{ params: { id: 1 } }} />); //rød strek under, da bruker du den feil eller ikke skjønner hva den snakker om
    
    taskService
      .get(1)
      .then(
        (task) =>
        {
          expect(
            wrapper.containsAllMatchingElements(
              [
                <Column width={2}>Title:</Column>,
                <Column>{task.title}</Column>,
                <Column width={2}>Description:</Column>,
                <Column>{task.description}</Column>,
                <Column width={2}>Done:</Column>,
                <Form.Checkbox checked={task.done} disabled />
              ]
            )
          ).toEqual(true);

          done();
        }
      )
    }
  );

  test('TaskDetails renders correctly with snapshot', () => {
    const tree = renderer
      .create(<TaskDetails match={{ params: { id: 1 } }} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('TaskEdit renders correctly with snapshot', () => {
    const tree = renderer
      .create(<TaskEdit match={{ params: { id: 1 } }} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });


//endre teksten i tekstfeltene
// Shallow lar oss lage nettside OG manipulere den, mens render, bare rendrer nettsiden
  test('TaskEdit sucsesfully updates task', (done) => {
    const wrapper = shallow(<TaskEdit match={{ params: { id: 1 } }} />);

    wrapper.find(Form.Input).simulate('change', { currentTarget: { value: 'Test Title' } });
    // @ts-ignore
    expect(wrapper.containsMatchingElement(<Form.Input value="Test Title" />)).toEqual(true);

    wrapper.find(Form.Textarea).simulate('change', { currentTarget: { value: 'Test description for test task' } });
    // @ts-ignore
    expect(wrapper.containsMatchingElement(<Form.Textarea value="Test description for test task" />)).toEqual(true);
    
    wrapper.find(Form.Checkbox).simulate('change', { currentTarget: { checked: true } });
    // @ts-ignore
    expect(wrapper.containsMatchingElement(<Form.Checkbox checked={true} />)).toEqual(true);

    // Wait for events to complete
    setTimeout(
      () => {
        wrapper.find(Button.Success).simulate('click');
        
        setTimeout(
          () =>
          {
            expect(location.hash).toEqual('#/tasks/1');
            done();
          }
        );
      }
    );
  });
});
