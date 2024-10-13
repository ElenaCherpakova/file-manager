import { cpus } from 'node:os';
import { colors } from '../utils/colors.js';

export const getCPUs = () => {
  const totalAmountOfCPU = cpus().length;
  const qntOfCPU = cpus().map((cpu, index) => {
    return {
      CPU: `CPU ${index + 1}`,
      model: cpu.model,
      'Clock Rate (GHz)': (cpu.speed / 1000).toFixed(2),
    };
  });
  console.log(`${colors.blue} Overall amount of CPUs: ${totalAmountOfCPU}${colors.reset}`);
  console.table(qntOfCPU);
};
