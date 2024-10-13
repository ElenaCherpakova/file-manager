import { cpus } from 'node:os';

export const getCPUs = () => {
  const totalAmountOfCPU = cpus().length;
  const qntOfCPU = cpus().map((cpu, index) => {
    return {
      CPU: `CPU ${index + 1}`,
      model: cpu.model,
      'Clock Rate (GHz)': (cpu.speed / 1000).toFixed(2),
    };
  });
  console.log(`Overall amount of CPUs: ${totalAmountOfCPU}`);
  console.table(qntOfCPU);
};
