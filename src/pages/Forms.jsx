import React from 'react';
import { Accordion, AccordionItem } from '@szhsin/react-accordion';
import Title from '../components/Title';
import { useNavigate } from 'react-router-dom';

const Forms = () => {
    const navigate = useNavigate();

    const toolsData = [
        { label: 'Body Harness', route: '/forms/tools/body_harness' },
        { label: 'Chipper Machine', route: '/forms/tools/chipper_machine' },
        { label: 'Hand Tools', route: '/forms/tools/hand_tools' },
        { label: 'Ply Cutter', route: '/forms/tools/ply_cutter' },
        { label: 'Rod Cutter', route: '/forms/tools/rod_cutting' },
        { label: 'Tile Cutter', route: '/forms/tools/tiles_cutting' },
        { label: 'Vibrator Machine', route: '/forms/tools/vibrator_machine' },
    ];

    const jobsData = [
        { label: 'Brick Masonry', route: '/forms/jobs/brick_masonry' },
        { label: 'Micro Concrete', route: '/forms/jobs/micro_concrete' },
        { label: 'Mortar', route: '/forms/jobs/mortar' },
        { label: 'Painting', route: '/forms/jobs/painting' },
        { label: 'Plastering', route: '/forms/jobs/plastering' },
    ];

    const fieldData = [
        { label: 'Compressive Test', route: '/forms/field_tests/compressive_test' },
        { label: 'Concrete Pour Card', route: '/forms/field_tests/concrete_pour_card' },
        { label: 'Request for Inspection (RFI)', route: '/forms/field_tests/site_inspection' }
    ];

    return (
        <div className="container">
            <Title text="Forms List" />
            <Accordion>
                <AccordionItem header="Tools Checklists">
                    {toolsData.map(item => (
                        <div key={item.label} className="accordion-item" onClick={() => navigate(item.route)}>
                            {item.label}
                        </div>
                    ))}
                </AccordionItem>

                <AccordionItem header="Job Specific Checklists">
                    {jobsData.map(item => (
                        <div key={item.label} className="accordion-item" onClick={() => navigate(item.route)}>
                            {item.label}
                        </div>
                    ))}
                </AccordionItem>

                <AccordionItem header="Field Checklists">
                    {fieldData.map(item => (
                        <div key={item.label} className="accordion-item" onClick={() => navigate(item.route)}>
                            {item.label}
                        </div>
                    ))}
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default Forms;
