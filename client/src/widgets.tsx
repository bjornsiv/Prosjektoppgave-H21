// Her ligger widgets, laget med Bootstrap
import * as React from 'react';
import { ReactNode, ChangeEvent, useState } from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import rater from 'rater-js';
import ReactDOM from 'react-dom';

// Card - for å ramme inn innhold på nettsiden, kan sette tittel
// Properties: title
export class Card extends Component<{ title: ReactNode }> {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <p className="card-title">{this.props.title}</p>
          <div className="card-text">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

// Row
export class Row extends Component {
  render() {
    return <div className="row">{this.props.children}</div>;
  }
}

export class CardRow extends Component {
  render() {
    return (
      <div className="card">
        <div className="row">{this.props.children}</div>);
      </div>
    );
  }
}

export class ColumnPadd extends Component<{ width?: number; right?: boolean }> {
  render() {
    return (
      <div padding-left={5}>
        <div className={'col' + (this.props.width ? '-' + this.props.width : '')}>
          <div className={'float-' + (this.props.right ? 'end' : 'start')}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
// Column (properties: width, right)
export class Column extends Component<{ width?: number; right?: boolean }> {
  render() {
    return (
      <div className={'col' + (this.props.width ? '-' + this.props.width : '')}>
        <div className={'float-' + (this.props.right ? 'end' : 'start')}>{this.props.children}</div>
      </div>
    );
  }
}

// Button Success - opprette spill, anmeldelse, rating
// properties: onClick
class ButtonSuccess extends Component<{ onClick: () => void }> {
  render() {
    return (
      <button type="button" className="btn btn-success" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

// Button Danger - slette spill, slette anmeldelse, slette rating
// properties: onClick
class ButtonDanger extends Component<{ onClick: () => void }> {
  render() {
    return (
      <button type="button" className="btn btn-danger" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

// Button Light - lys knapp som brukes til ...
// properties: onClick
class ButtonLight extends Component<{ onClick: () => void }> {
  render() {
    return (
      <button type="button" className="btn btn-light" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

class ButtonInfo extends Component<{ onClick: () => void }> {
  render() {
    return (
      <button type="button" className="btn btn-info" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

// Denne passer godt inn med bakgrunnsfargene - vil bli mest brukt
class ButtonSecondary extends Component<{ onClick: () => void }> {
  render() {
    return (
      <button type="button" className="btn btn-secondary" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

export class Button {
  static Success = ButtonSuccess;
  static Danger = ButtonDanger;
  static Light = ButtonLight;
  static Info = ButtonInfo;
  static Secondary = ButtonSecondary;
}

// Navigation bar link (properties: to)
export class NavBarLink extends Component<{ to: string }> {
  render() {
    return (
      <NavLink className="nav-link" activeClassName="active" to={this.props.to}>
        {this.props.children}
      </NavLink>
    );
  }
}

// Navigation bar (properties: brand)
export class NavBar extends Component<{ brand: ReactNode }> {
  static Link = NavBarLink;


  render() {
    return (
      <nav className="styling-navbar navbar navbar-expand-sm navbar-light bg-light">
        <div className="container-fluid justify-content-start">
          <NavLink className="navbar-brand" activeClassName="active" exact to="/">
            {this.props.brand}
          </NavLink>
          <div className="navbar-nav">{this.props.children}</div>
        </div>
      </nav>
    );
  }
}

// Form label - etikett
class FormLabel extends Component {
  render() {
    return <label className="col-form-label">{this.props.children}</label>;
  }
}

// Form input - legge til spill
class FormInput extends Component<{
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  [prop: string]: any;
}> {
  render() {
    // ...rest will contain extra passed attributes such as disabled, required, width, height, pattern
    // For further information, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    const { type, value, onChange, ...rest } = this.props;
    return (
      <input
        {...rest}
        className="form-control"
        type={this.props.type}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

class FormNumberInput extends Component<{
  value: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  [prop: number]: any;
}> {
  render() {
    // ...rest will contain extra passed attributes such as disabled, required, width, height, pattern
    // For further information, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    const { value, onChange, ...rest } = this.props;
    return (
      <input
        {...rest}
        type="number"
        className="form-control"
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

// Form textarea - legge til spill
class FormTextarea extends React.Component<{
  value: string | number;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  [prop: string]: any;
}> {
  render() {
    // ...rest will contain extra passed attributes such as disabled, required, rows, cols
    // For further information, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    const { value, onChange, ...rest } = this.props;
    return <textarea {...rest} className="form-control" value={value} onChange={onChange} />;
  }
}

// Form checkbox
class FormCheckbox extends Component<{
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  [prop: string]: any;
}> {
  render() {
    // ...rest will contain extra passed attributes such as disabled, required, width, height, pattern
    // For further information, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    const { checked, onChange, ...rest } = this.props;
    return (
      <input
        {...rest}
        className="form-check-input"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
    );
  }
}

// Form select
class FormSelect extends Component<{
  value: string | number;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  [prop: string]: any;
}> {
  render() {
    // ...rest will contain extra passed attributes such as disabled, required, size.
    // For further information, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    const { value, onChange, children, ...rest } = this.props;
    return (
      <select {...rest} className="custom-select" value={value} onChange={onChange}>
        {children}
      </select>
    );
  }
}

class FormDate extends Component<{
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  [prop: string]: any;
}> {
  render() {
    const { placeholder, value, onChange, ...rest } = this.props;
    return (
      <div>
        <input
          className="form-control"
          type="date"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          {...rest}
        ></input>
      </div>
    );
  }
}

class FormSelectDropdown extends Component<{
  valueList: string[];
  value: string;

  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  [prop: string]: any;
}> {
  render() {
    const { value, valueList, onChange, ...rest } = this.props;
    return (
      <div>
        <select className="dropdown-menu" value={value} onChange={onChange} {...rest}>
          {valueList.map((valueList, i) => {
            return (
              <option key={i} className="dropdown-item" value={valueList}>
                {valueList}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

export class Form {
  static Label = FormLabel; // = From.Label osv.
  static Input = FormInput;
  static Textarea = FormTextarea;
  static Checkbox = FormCheckbox;
  static Select = FormSelect;
  static NumberInput = FormNumberInput;
  static Date = FormDate;
  static Genra = FormSelectDropdown;
}

// Alert messages - beskjeder på nettsiden
export class Alert extends Component {
  alerts: { id: number; text: ReactNode; type: string }[] = [];
  nextId: number = 0;
  render() {
    return (
      <div>
        {this.alerts.map((alert, i) => (
          <div
            key={alert.id}
            className={'alert alert-dismissible alert-' + alert.type}
            role="alert"
          >
            {alert.text}
            <button
              type="button"
              className="btn-close btn-sm"
              onClick={() => this.alerts.splice(i, 1)}
            />
          </div>
        ))}
      </div>
    );
  }

  // Success alert
  static success(text: ReactNode) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      let instance = Alert.instance(); // Get rendered Alert component instance
      if (instance) instance.alerts.push({ id: instance.nextId++, text: text, type: 'success' });
    });
  }

  // Info alert
  static info(text: ReactNode) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      let instance = Alert.instance(); // Get rendered Alert component instance
      if (instance) instance.alerts.push({ id: instance.nextId++, text: text, type: 'info' });
    });
  }

  // Warning alert
  static warning(text: ReactNode) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      let instance = Alert.instance(); // Get rendered Alert component instance
      if (instance) instance.alerts.push({ id: instance.nextId++, text: text, type: 'warning' });
    });
  }

  // Danger alert
  static danger(text: ReactNode) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      let instance = Alert.instance(); // Get rendered Alert component instance
      if (instance) instance.alerts.push({ id: instance.nextId++, text: text, type: 'danger' });
    });
  }
}

/*
// Messages (Sivert) - ta bort hvis fra chat-app?
class Messages extends Component<{ from: string; message: string; key: number }> {
  render() {
    return (
      <div className="card" style={{ width: '18rem' }} key={this.props.key}>
        <span className="card-text">
          {this.props.from}: {this.props.message}{' '}
        </span>
      </div>
    );
  }
}

// Send (Sivert) - ta bort hvis fra chat-app?
class Send extends Component<{ incomName: string; key: number }> {
  render() {
    return (
      <div className="card" style={{ width: '18rem' }} key={this.props.key}>
        <span className="card-text"> {this.props.incomName} </span>
      </div>
    );
  }
}

export class List {
  static Message = Messages;
  static Send = Send;
}
*/

// Søkefelt. Hentet fra (Forms) https://getbootstrap.com/docs/4.0/components/navbar/#forms
// Har endret fra success til secondary button
export class SearchBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <form className="form-inline">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-secondary my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </nav>
    );
  }
}

// Innlogging. Hentet fra (Menu forms) https://getbootstrap.com/docs/4.0/components/dropdowns/#menu-forms
// Mulig vi ikke kommer til å bruke denne hvis vi har innlogging via fb e.l.
// Bytte ut
export class SignIn extends Component {
  render() {
    return (
      <div className="dropdown-menu">
        <form className="px-4 py-3">
          <div className="form-group">
            <label htmlFor="exampleDropdownFormEmail1">E-post</label>
            <input
              type="email"
              className="form-control"
              id="exampleDropdownFormEmail1"
              placeholder="email@example.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleDropdownFormPassword1">Passord</label>
            <input
              type="password"
              className="form-control"
              id="exampleDropdownFormPassword1"
              placeholder="Password"
            />
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="dropdownCheck" />
            <label className="form-check-label" htmlFor="dropdownCheck">
              Husk meg
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Logg inn
          </button>
        </form>
        <div className="dropdown-divider"></div>
        <a className="dropdown-item" href="#">
          Opprett ny bruker
        </a>
        <a className="dropdown-item" href="#">
          Glemt passordet?
        </a>
      </div>
    );
  }
}

// Rating stjerner 1-5 med rater-js: https://www.npmjs.com/package/rater-js

export class StarRating extends Component<{
  value: number;
  edit: boolean;
  onChange?: (element: StarRating, value: number) => void;
}> {
  rating: Rater | null = null;

  onChange(value: number, done?: (() => any) | undefined) {
    if (this.props.onChange) {
      this.props.onChange(this, value);
    }
    if (done) {
      done();
    }
  }

  mounted() {
    const element = ReactDOM.findDOMNode(this);

    if (element instanceof HTMLElement && !isNaN(this.props.value)) {
      this.rating = rater({
        element: element,
        rateCallback: this.props.onChange ? this.onChange : undefined,
        readOnly: !this.props.edit,
      });

      this.rating.setRating(this.props.value);
    }
  }

  render() {
    return <div />;
  }
}

/* Må legge inn Bootstrap Vue hvis disse skal brukes */

/*
// Rating 1-5 stjerner (fungerer ikke, må fikses senere)
class Rating extends Component<{ onClick: () => void, ratingValue: number }> {
  render() {
    return (
      <template>
        <div>
          <label htmlFor="rating-inline">Inline rating:</label>
          <b className="form-rating" id="rating-inline" inline-value="4"></b>
        </div>
      </template>
    );
  }
}

/*
// Image - bilder av spill o.l.
export class Image extends Component {
  render() {
    return (
      <div>
        <b-img src="https://picsum.photos/1024/400/?image=41" fluid alt="Responsive image"></b-img>
      </div>
    );
  }
}

*/
