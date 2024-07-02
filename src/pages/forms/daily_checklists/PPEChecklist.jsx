import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useVendor } from '../../../context/vendor_context';
import { supabase } from '../../../supabaseClient';
import InputField from '../../../components/InputField';
import Subheading from '../../../components/Subheading';

import '../../../styles/ppeChecklist.css'

const PPEChecklist = () => {
    const { vendorId, user_id } = useVendor();
    const { logId, projectId } = useParams();
    const navigate = useNavigate();

    const [vendorList, setVendorList] = useState([]);
    const [selectedPpeItems, setSelectedPpeItems] = useState([]);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [pNo, setPNo] = useState('');
    const [name, setName] = useState('');
    const [remarks, setRemarks] = useState('');

    const ppe_items = [
        { key: 'helmet', value: 'Helmet' },
        { key: 'shoes', value: 'Shoes' },
        { key: 'gloves', value: 'Gloves' },
        { key: 'goggles', value: 'Goggles' },
        { key: 'fluorescent_jacket', value: 'Fluorescent Jacket' },
        { key: 'fire_jacket', value: 'Fire Jacket' },
        { key: 'mask', value: 'Mask' },
        { key: 'ear_plugs', value: 'Ear Plugs' },
        { key: 'shin_guard', value: 'Shin Guard' },
        { key: 'rubber_gloves', value: 'Rubber Gloves' },
        { key: 'gum_boot', value: 'Gum Boot' },
        { key: 'safety_belt', value: 'Safety Belt' },
        { key: 'face_shield', value: 'Face Shield' },
        { key: 'screen_guard', value: 'Screen Guard' },
        { key: 'gas_cutting_goggles', value: 'Gas Cutting Goggles' },
        { key: 'leather_gloves', value: 'Leather Gloves' }
    ];

    useEffect(() => {
        fetchEntries();
    }, []);

    const handleCheckBoxChange = (item) => {
        setSelectedPpeItems(prevSelectedItems =>
            prevSelectedItems.includes(item)
                ? prevSelectedItems.filter(i => i !== item)
                : [...prevSelectedItems, item]
        );
    };

    const toggleExpanded = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleAdd = async () => {
        try {
            const { data, error } = await supabase
                .from('ppe_checklist')
                .insert([
                    {
                        vendor_id: vendorId,
                        log_id: logId,
                        created_on: new Date().toISOString().split('T')[0], // format date as YYYY-MM-DD
                        project_id: projectId,
                        ppe_items: selectedPpeItems,
                        p_no: pNo,
                        name: name,
                        remarks: remarks,
                        created_by: user_id,
                    }
                ]);
            if (error) {
                alert('Error', error.message);
            } else {
                console.log('PPE checklist inserted successfully:');
                setVendorList([...vendorList, { p_no: pNo, name: name, ppe_items: selectedPpeItems, remarks: remarks }]);
                setModalVisible(false);
                setPNo('');
                setName('');
                setRemarks('');
                setSelectedPpeItems([]);
            }
        } catch (error) {
            console.error('Error creating project:', error);
            alert('Error', 'An unexpected error occurred while creating the project.');
        }
    };

    const fetchEntries = async () => {
        try {
            const today = new Date().toISOString().split('T')[0]; // format date as YYYY-MM-DD
            const { data, error } = await supabase
                .from('ppe_checklist')
                .select('*')
                .eq('vendor_id', vendorId)
                .eq('created_on', today)
                .eq('log_id', logId);

            if (error) {
                console.error('Error fetching entries:', error);
                return;
            }

            setVendorList(data);
        } catch (error) {
            console.error('Error fetching entries:', error);
        }
    };

    return (
        <div className="container">
            <Subheading text={`Project ${projectId}`} />

            <div onClick={toggleExpanded} className="card">
                <div className="card-header">
                    <h2>PPE Checklist</h2>
                    <i className={`icon ${isCollapsed ? 'down' : 'up'}`} />
                </div>
            </div>
            <div className={`collapse ${isCollapsed ? 'collapsed' : ''}`}>
                <div className="checkbox-container">
                    {ppe_items.map((item) => (
                        <div key={item.key} className="checkbox">
                            <label>
                                <input
                                    type="checkbox"
                                    onChange={() => handleCheckBoxChange(item.value)}
                                    checked={selectedPpeItems.includes(item.value)}
                                />
                                {item.value}
                            </label>
                        </div>
                    ))}
                </div>
                <div className="selected-items-container">
                    <h3>Selected Items:</h3>
                    {selectedPpeItems.map(item => (
                        <div key={item} className="selected-item">{item}</div>
                    ))}
                </div>
            </div>
            <button onClick={() => setModalVisible(true)} className="button">
                Add entry
            </button>
            {modalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setModalVisible(false)}>&times;</span>
                        <h2>Add PPE Entry</h2>
                        <InputField placeholder="Personal Number" iconLib="user" onChangeText={setPNo} />
                        <InputField placeholder="Name" iconLib="id-badge" onChangeText={setName} />
                        <InputField placeholder="Remarks" iconLib="comment" onChangeText={setRemarks} />
                        <button className="button" onClick={handleAdd}>
                            Submit
                        </button>
                    </div>
                </div>
            )}
            <div className="list-container">
                <h3>PPE Entries:</h3>
                {vendorList.length > 0 ? (
                    vendorList.map((entry, index) => (
                        <div key={index} className="entry">
                            <div>P No: {entry.p_no}</div>
                            <div>Name: {entry.name}</div>
                            <div>Items: {entry.ppe_items.join(', ')}</div>
                            <div>Remarks: {entry.remarks}</div>
                        </div>
                    ))
                ) : (
                    <div>No entries found for today.</div>
                )}
            </div>
        </div>
    );
};

export default PPEChecklist;
