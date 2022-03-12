import React from 'react';
import {Link} from "react-router-dom";
import Table from '../common/Table'
import { getAllPeople } from '../../store/selectors/people';
import { deletePerson, changeBelovedStatus } from '../../store/actions/people';
import { connect } from 'react-redux'

const PeoplePage = ({people, dispatchDeletePerson, dispatchChangeBelovedStatus}) => {
    
    const handleBelovedStatus = id => {
        dispatchChangeBelovedStatus(id);
    }

    const handleDelete = (id) => {
        dispatchDeletePerson(id);
    }

    const getColumns = () => {
        if (!people.length) return [];

        return Object.keys(people[0]).map(colName => {
            if (colName === 'beloved') {
                return {
                    colName,
                    content: ({beloved, id}) => (
                        <input
                            type="checkbox"
                            checked={beloved}
                            onChange={() => handleBelovedStatus(id)}
                        />
                    )
                }
            }
            if (colName === 'name') {
                return {
                    colName,
                    content: ({name, id}) => (
                        <Link style={{color: '#ffc107'}} to={`/people/${id}`}>{name}</Link>
                    )
                }
            }
            return {colName}
        })
    }

    return (
        <div>
            <h3>People from Star Wars Universe</h3>
            <Link
                to={"/people/new"}
                className="btn btn-warning"
                style={{marginBottom: 25}}
            >
                New Person
            </Link>
            <Table
                columns={getColumns()}
                data={Object.values(people)}
                tableDescriptor="People"
                onDelete={handleDelete}
            />
        </div>

    );
};

const mapStateToProps = state => {
    return {
        people: getAllPeople(state)
    };
}

const mapDispatchToProps = dispatch => {
    return {
        dispatchDeletePerson: id => {
            dispatch(deletePerson(id));
        },
        dispatchChangeBelovedStatus: id => {
            dispatch(changeBelovedStatus(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PeoplePage);
