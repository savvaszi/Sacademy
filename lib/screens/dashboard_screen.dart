import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/academy_provider.dart';
import 'package:go_router/go_router.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Sports Academy Dashboard'),
      ),
      body: Consumer<AcademyProvider>(
        builder: (context, provider, _) {
          if (provider.isLoading) {
            return const Center(child: CircularProgressIndicator());
          }

          return SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Overview',
                  style: Theme.of(context).textTheme.headlineSmall,
                ),
                const SizedBox(height: 16),
                GridView.count(
                  crossAxisCount: 2,
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  mainAxisSpacing: 16,
                  crossAxisSpacing: 16,
                  children: [
                    _StatCard(
                      title: 'Total Students',
                      value: '${provider.totalStudents}',
                      icon: Icons.people,
                      color: Colors.blue,
                    ),
                    _StatCard(
                      title: 'Active Classes',
                      value: '${provider.activeClasses}',
                      icon: Icons.sports,
                      color: Colors.green,
                    ),
                    _StatCard(
                      title: 'Attendance Rate',
                      value: '${provider.attendanceRate.toStringAsFixed(1)}%',
                      icon: Icons.check_circle,
                      color: Colors.orange,
                    ),
                    _StatCard(
                      title: 'Monthly Revenue',
                      value: '€${provider.monthlyRevenue.toStringAsFixed(0)}',
                      icon: Icons.euro,
                      color: Colors.purple,
                    ),
                  ],
                ),
                const SizedBox(height: 24),
                Text(
                  'Quick Actions',
                  style: Theme.of(context).textTheme.headlineSmall,
                ),
                const SizedBox(height: 16),
                Wrap(
                  spacing: 12,
                  runSpacing: 12,
                  children: [
                    ElevatedButton.icon(
                      onPressed: () => context.go('/students'),
                      icon: const Icon(Icons.person_add),
                      label: const Text('Manage Students'),
                    ),
                    ElevatedButton.icon(
                      onPressed: () => context.go('/classes'),
                      icon: const Icon(Icons.class_),
                      label: const Text('View Classes'),
                    ),
                    ElevatedButton.icon(
                      onPressed: () => context.go('/attendance'),
                      icon: const Icon(Icons.check),
                      label: const Text('Mark Attendance'),
                    ),
                    ElevatedButton.icon(
                      onPressed: () => context.go('/payments'),
                      icon: const Icon(Icons.payment),
                      label: const Text('Payments'),
                    ),
                  ],
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}

class _StatCard extends StatelessWidget {
  final String title;
  final String value;
  final IconData icon;
  final Color color;

  const _StatCard({
    required this.title,
    required this.value,
    required this.icon,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 40, color: color),
            const SizedBox(height: 8),
            Text(
              value,
              style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: color,
                  ),
            ),
            const SizedBox(height: 4),
            Text(
              title,
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.bodySmall,
            ),
          ],
        ),
      ),
    );
  }
}
