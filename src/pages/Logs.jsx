import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LogCard from '../components/LogCard';
import { useVendor } from '../context/vendor_context';
import { supabase } from '../supabaseClient';
import Title from '../components/Title';
import '../styles/logs.css';

const Logs = () => {
    const { vendorId } = useVendor();
    const [logs, setLogs] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchLogs();
    }, [vendorId]);

    const fetchLogs = async () => {
        setRefreshing(true);
        try {
            const { data: logData, error: logError } = await supabase
                .from('logs')
                .select('*')
                .eq('vendor_id', vendorId)
                .order('created_on', { ascending: false });

            if (logError) {
                console.error('Error fetching logs:', logError);
                return;
            }

            const projectIds = [...new Set(logData.map(log => log.project_id))];
            const { data: projectData, error: projectError } = await supabase
                .from('projects')
                .select('project_id, project_title')
                .in('project_id', projectIds);

            if (projectError) {
                console.error('Error fetching project names:', projectError);
                return;
            }

            const projectMap = projectData.reduce((pid, project) => {
                pid[project.project_id] = project.project_title;
                return pid;
            }, {});

            const processedLogs = logData.map(log => {
                const createdOn = new Date(log.created_on);
                const date = createdOn.toLocaleDateString();
                const day = createdOn.toLocaleDateString('en-US', { weekday: 'long' });
                const projectName = projectMap[log.project_id] || 'Unknown Project';

                return {
                    ...log,
                    date,
                    day,
                    project_title: projectName,
                };
            }).sort((a, b) => new Date(b.created_on).getTime() - new Date(a.created_on).getTime());

            setLogs(processedLogs);
        } catch (error) {
            console.error('Error fetching logs:', error.message);
        }
        setRefreshing(false);
    };

    return (
        <div className="container">
            <Title text="Daily Logs" />
            <div className="logs-list">
                {logs.map((log) => (
                    <Link key={log.log_id} to={`/logs/${log.log_id}`}>
                        <LogCard log={log} />
                    </Link>
                ))}
            </div>
            <button onClick={fetchLogs} disabled={refreshing}>
                {refreshing ? 'Refreshing...' : 'Refresh Logs'}
            </button>
        </div>
    );
};

export default Logs;
