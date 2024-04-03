import {createContext} from 'react';
import {Tasks} from './taskList';

export const taskListContext = createContext<Tasks | undefined>(undefined);