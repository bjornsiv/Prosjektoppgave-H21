import * as React from 'react';
import { ReactNode, ChangeEvent } from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';

class Messagesss extends Component<{ from: string; message: string; key: number }> {
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
    static Message = Messagesss;
    static Send = Send;
    }


export class Card extends Component<{ title: ReactNode }> {
    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{this.props.title}</h5>
                        <div className="card-text">{this.props.children}</div>
                    </div>
            </div>
            );
            }
        }

        export class Row extends Component {
        render() {
        return <div className="row">{this.props.children}</div>;
        }
        }

        export class Column extends Component<{ width?: number; right?: boolean }> {
        render() {
        return (
        <div className={'col' + (this.props.width ? '-' + this.props.width : '')}>
        <div className={'float-' + (this.props.right ? 'end' : 'start')}>{this.props.children}</div>
        </div>
        );
        }
        }

        class NavBarLink extends Component<{ to: string }> {
        render() {
        return (
        <NavLink className="nav-link" activeClassName="active" to={this.props.to}>
        {this.props.children}
        </NavLink>
        );
        }
        }

        export class NavBar extends Component<{ brand: ReactNode }> {
        static Link = NavBarLink;

        render() {
        return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
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
        }