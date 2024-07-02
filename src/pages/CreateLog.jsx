// CreateLog.js
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Updated to useNavigate
import InputField from '../components/InputField'; // Replace with your actual component
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import moment from 'moment'; // Ensure moment is installed
import { useVendor } from '../context/vendor_context'; // Replace with your actual vendor context
import { supabase } from '../supabaseClient'; // Replace with your actual supabase client

import '../styles/createLog.css';

// import './forms/daily_checklists/PPEChecklist'

const CreateLog = () => {
    const navigate = useNavigate(); // Updated to useNavigate
    const { vendorId, user_id } = useVendor(); // Replace with your actual vendor context
    const { projectId } = useParams(); // Replace with your actual search params hook

    const [workPermit, setWorkPermit] = useState('');
    const [sopNumber, setSopNumber] = useState('');
    const [numberOfWorkers, setNumberOfWorkers] = useState('');
    const [validFrom, setValidFrom] = useState(new Date());
    const [validTill, setValidTill] = useState(new Date());
    const [logId, setLogId] = useState(null);

    const addLog = async () => {
        try {
            const { data, error } = await supabase.from('logs').insert([
                {
                    vendor_id: vendorId,
                    project_id: projectId,
                    work_permit: workPermit,
                    valid_from: validFrom.toISOString(),
                    valid_till: validTill.toISOString(),
                    num_workers: parseInt(numberOfWorkers),
                    created_by: user_id,
                    created_on: new Date()
                }
            ]).select();

            if (error) {
                console.error('Error adding log:', error);
                return;
            }

            const logID = data[0].log_id;
            setLogId(logID);
            alert('Log added successfully');
            console.log('Log added with ID:', logID);
        } catch (error) {
            alert('Unexpected error:', error.message);
            console.error('Unexpected error:', error);
        }
    };

    const handleNavigation = (pathname) => {
        if (logId) {
            navigate(pathname, { state: { logId, projectId } });
        } else {
            alert('Please Create the Log First');
        }
    };

    const [isModalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <div className="container">
            <div className="log-info">
                <p>Vendor ID: {vendorId}</p>
                <p>Date: {new Date().toDateString()}</p>
                <p>Project ID: {projectId}</p>
            </div>

            <InputField placeholder="Work Permit ID" onChangeText={setWorkPermit} />
            <InputField placeholder="SOP Number" onChangeText={setSopNumber} />
            <InputField placeholder="Number of Workers" onChangeText={setNumberOfWorkers} />

            {/* Uncomment and use these components if available */}
            {/* 
            <DatePickerField placeholder="Valid From" date={validFrom} setDate={setValidFrom} />
            <DatePickerField placeholder="Valid Till" date={validTill} setDate={setValidTill} /> 
            */}

            {/* src\pages\forms\daily_checklists\PPEChecklist.jsx */}

            <PrimaryButton text="Create Today's Log" onPress={addLog} />

            <SecondaryButton text="PPE Checklist" onClick={() => handleNavigation('./forms/daily_checklists/PPEChecklist')} />
            <SecondaryButton text="Tool Box Talk" onClick={() => handleNavigation('./forms/daily_checklists/ToolBoxTalk')} />
            <SecondaryButton text="First Aid Checklist" onPress={() => handleNavigation('../forms/first_aid')} />
            <SecondaryButton text="FIM Requirement" onPress={() => handleNavigation('../forms/FIM')} />
            <SecondaryButton text="Add Photo" onPress={openModal} />

            {/* Uncomment and use this component if available */}
            {/* 
            {isModalVisible && (
                <AddPhoto isVisible={isModalVisible} closeModal={closeModal} folderPath={`logs`} logId={logId} createdBy={user_id} tag='log' />
            )} 
            */}
        </div>
    );
};

export default CreateLog;
