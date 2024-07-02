import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../../supabaseClient';
import InputField from '../../../components/InputField';
import Subheading from '../../../components/Subheading';
import MultiLineInput from '../../../components/TextAreaInput'
import PrimaryButton from '../../../components/PrimaryButton';
import { useVendor } from '../../../context/vendor_context';
import moment from 'moment';
import '../../../styles/toolBoxTalk.css'


const ToolBoxTalk = () => {
    const { vendorId, user_id } = useVendor();
    const { logId, projectId } = useParams();
    const navigate = useNavigate();

    const [sopNumber, setSopNumber] = useState('');
    const [location, setLocation] = useState('');
    const [department, setDepartment] = useState('');
    const [supervisor, setSupervisor] = useState('');
    const [safetyRep, setSafetyRep] = useState('');
    const [contractorRep, setContractorRep] = useState('');
    const [safetyContact, setSafetyContact] = useState('');
    const [actionItems, setActionItems] = useState('');
    const [prevIncidents, setPrevIncidents] = useState('');
    const [safetyMessage, setSafetyMessage] = useState('');
    const [checkedItems, setCheckedItems] = useState([]);
    const [numWorkers, setNumWorkers] = useState('');
    const [numSupervisors, setNumSupervisors] = useState('');
    const [hazard, setHazard] = useState('');
    const [checkedStripes, setCheckedStripes] = useState([]);

    const checkBoxLabels = [
        "PPE", "Housekeeping", "Tools and Tackles", "Electrical Equipment Condition",
        "Six Directional Hazards", "Work Permits", "No Alcohol regulations",
        "Safe Behaviour and Its Importance", "Gas Hazards", "First Aid",
        "Other Hazardous Material", "Team Work Approach"
    ];

    const stripesList = ['Red Stripes', 'Orange Stripes', 'Green Stripes'];

    const handleCheckboxChange = (label) => {
        setCheckedItems(prev => {
            if (prev.includes(label)) {
                return prev.filter(item => item !== label);
            } else {
                return [...prev, label];
            }
        });
    };

    const handleStripesChange = (label) => {
        setCheckedStripes(prev => {
            if (prev.includes(label)) {
                return prev.filter(item => item !== label);
            } else {
                return [...prev, label];
            }
        });
    };

    const addEntry = async () => {
        const { data, error } = await supabase
            .from('tool_box_talk')
            .insert([
                {
                    created_on: moment().format(),
                    department: department,
                    safety_rep: safetyRep,
                    contractor_rep: contractorRep,
                    num_workers: parseInt(numWorkers),
                    num_supervisors: parseInt(numSupervisors),
                    supervisor_or_manager: supervisor,
                    SOP_no: sopNumber,
                    action_items: actionItems,
                    prev_incident: prevIncidents,
                    reminders: checkedItems,
                    safety_msg: safetyMessage,
                    hazards: hazard,
                    location: location,
                    safety_contact: parseInt(safetyContact),
                    stripes: checkedStripes,
                    vendor_id: vendorId,
                    project_id: projectId,
                    created_by: user_id,
                    log_id: logId,
                }
            ]).select();

        if (error) {
            alert('Error', error.message);
        } else {
            alert('Success', 'Entry added successfully');
            navigate(-1); // Navigate back
        }
    };

    return (
        <div className="container">
            <div className="form">
                <InputField placeholder="SOP Number" iconLib="file" onChange={e => setSopNumber(e.target.value)} value={sopNumber} />
                <InputField placeholder="Location" iconLib="map-marker" onChange={e => setLocation(e.target.value)} value={location} />
                <InputField placeholder="Department" iconLib="building" onChange={e => setDepartment(e.target.value)} value={department} />
                <InputField placeholder="Company Supervisor / Line Manager" iconLib="user" onChange={e => setSupervisor(e.target.value)} value={supervisor} />
                <InputField placeholder="Safety Representative" iconLib="shield" onChange={e => setSafetyRep(e.target.value)} value={safetyRep} />
                <InputField placeholder="Contractor's Representative" iconLib="user-secret" onChange={e => setContractorRep(e.target.value)} value={contractorRep} />
                <InputField placeholder="Safety Contact" iconLib="phone" onChange={e => setSafetyContact(e.target.value)} value={safetyContact} type="number" />
                <InputField placeholder="Potential Hazards Present" iconLib="exclamation-triangle" onChange={e => setHazard(e.target.value)} value={hazard} />
                <InputField placeholder="No. of Workers" iconLib="users" onChange={e => setNumWorkers(e.target.value)} value={numWorkers} type="number" />
                <InputField placeholder="No. of Supervisors" iconLib="users" onChange={e => setNumSupervisors(e.target.value)} value={numSupervisors} type="number" />

                <MultiLineInput
                    placeholder="Review of action items from previous meeting"
                    onChange={e => setPrevIncidents(e.target.value)}
                    value={prevIncidents}
                />
                <MultiLineInput
                    placeholder="General Safety items and any recent near miss incidents"
                    onChange={e => setActionItems(e.target.value)}
                    value={actionItems}
                />

                <div className="checklist">
                    <Subheading text="Reminders to employees on their personal responsibilities regarding:" />
                    <div className="checkbox-container">
                        {checkBoxLabels.map((label) => (
                            <div key={label} className="checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        onChange={() => handleCheckboxChange(label)}
                                        checked={checkedItems.includes(label)}
                                    />
                                    {label}
                                </label>
                            </div>
                        ))}
                    </div>

                    <Subheading text="Stripes List:" />
                    <div className="checkbox-container">
                        {stripesList.map((label) => (
                            <div key={label} className="checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        onChange={() => handleStripesChange(label)}
                                        checked={checkedStripes.includes(label)}
                                    />
                                    {label}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <MultiLineInput
                    placeholder="Safety message/handouts shared with employees"
                    onChange={e => setSafetyMessage(e.target.value)}
                    value={safetyMessage}
                />

                <PrimaryButton text="Add Entry" onPress={addEntry} />
            </div>
        </div>
    );
};

export default ToolBoxTalk;
