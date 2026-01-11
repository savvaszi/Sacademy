import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../screens/dashboard_screen.dart';
import '../screens/students_screen.dart';
import '../screens/classes_screen.dart';
import '../screens/attendance_screen.dart';
import '../screens/payments_screen.dart';

class AppRouter {
  static final GlobalKey<NavigatorState> _rootNavigatorKey = GlobalKey<NavigatorState>();

  static GoRouter createRouter() {
    return GoRouter(
      navigatorKey: _rootNavigatorKey,
      initialLocation: '/',
      debugLogDiagnostics: true,
      routes: [
        GoRoute(
          path: '/',
          name: 'dashboard',
          pageBuilder: (context, state) => NoTransitionPage(
            key: state.pageKey,
            child: const DashboardScreen(),
          ),
        ),
        GoRoute(
          path: '/students',
          name: 'students',
          pageBuilder: (context, state) => NoTransitionPage(
            key: state.pageKey,
            child: const StudentsScreen(),
          ),
        ),
        GoRoute(
          path: '/classes',
          name: 'classes',
          pageBuilder: (context, state) => NoTransitionPage(
            key: state.pageKey,
            child: const ClassesScreen(),
          ),
        ),
        GoRoute(
          path: '/attendance',
          name: 'attendance',
          pageBuilder: (context, state) => NoTransitionPage(
            key: state.pageKey,
            child: const AttendanceScreen(),
          ),
        ),
        GoRoute(
          path: '/payments',
          name: 'payments',
          pageBuilder: (context, state) => NoTransitionPage(
            key: state.pageKey,
            child: const PaymentsScreen(),
          ),
        ),
      ],
      errorBuilder: (context, state) => Scaffold(
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.error_outline, size: 64, color: Colors.red),
              const SizedBox(height: 16),
              Text(
                'Page not found: ${state.uri.path}',
                style: Theme.of(context).textTheme.headlineSmall,
              ),
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: () => context.go('/'),
                child: const Text('Go to Dashboard'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
