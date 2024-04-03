import {createContext} from 'react';
import {Task} from './taskList';

export const taskListContext = createContext<Task | undefined>(undefined);