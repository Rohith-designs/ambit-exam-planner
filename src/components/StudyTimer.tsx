import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Timer, Play, Pause, Square } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const StudyTimer = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [time, setTime] = useState(() => {
    const saved = localStorage.getItem('studyTimer');
    return saved ? JSON.parse(saved).time : 0;
  });
  const [isRunning, setIsRunning] = useState(() => {
    const saved = localStorage.getItem('studyTimer');
    return saved ? JSON.parse(saved).isRunning : false;
  });
  const [isPaused, setIsPaused] = useState(() => {
    const saved = localStorage.getItem('studyTimer');
    return saved ? JSON.parse(saved).isPaused : false;
  });
  const [startTime, setStartTime] = useState<number | null>(() => {
    const saved = localStorage.getItem('studyTimer');
    return saved ? JSON.parse(saved).startTime : null;
  });

  // Save timer state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('studyTimer', JSON.stringify({
      time,
      isRunning,
      isPaused,
      startTime
    }));
  }, [time, isRunning, isPaused, startTime]);

  // Handle timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setTime(prev => {
          const newTime = prev + 1;
          // Update localStorage immediately
          const saved = localStorage.getItem('studyTimer');
          const savedState = saved ? JSON.parse(saved) : {};
          localStorage.setItem('studyTimer', JSON.stringify({
            ...savedState,
            time: newTime
          }));
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, isPaused]);

  // Handle page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden, but keep timer running
        if (isRunning && !isPaused) {
          const saved = localStorage.getItem('studyTimer');
          const savedState = saved ? JSON.parse(saved) : {};
          localStorage.setItem('studyTimer', JSON.stringify({
            ...savedState,
            isRunning: true,
            isPaused: false
          }));
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isRunning, isPaused]);

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
    setStartTime(Date.now());
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleStop = async () => {
    if (!user || !startTime) return;

    const duration = Math.floor(time / 60); // Convert seconds to minutes
    if (duration > 0) {
      try {
        // Record study session
        await supabase
          .from('study_sessions')
          .insert({
            user_id: user.id,
            duration: duration
          });

        // Update total study time
        const { data: progress } = await supabase
          .from('user_progress')
          .select('total_study_time')
          .eq('user_id', user.id)
          .single();

        if (progress) {
          await supabase
            .from('user_progress')
            .update({
              total_study_time: (progress.total_study_time || 0) + duration
            })
            .eq('user_id', user.id);
        }

        toast({
          title: "Study session recorded!",
          description: `Great job studying for ${duration} minutes!`,
        });
      } catch (error) {
        console.error('Error recording study session:', error);
        toast({
          title: "Error",
          description: "Failed to record study session. Please try again.",
          variant: "destructive",
        });
      }
    }

    // Clear localStorage
    localStorage.removeItem('studyTimer');
    
    setTime(0);
    setIsRunning(false);
    setIsPaused(false);
    setStartTime(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Timer className="h-5 w-5" />
          Study Timer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-4">
          <div className="text-4xl font-mono font-bold text-blue-600">
            {formatTime(time)}
          </div>
          <div className="flex justify-center gap-2">
            {!isRunning ? (
              <Button onClick={handleStart} className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                Start
              </Button>
            ) : isPaused ? (
              <Button onClick={handleResume} className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                Resume
              </Button>
            ) : (
              <Button onClick={handlePause} variant="outline" className="flex items-center gap-2">
                <Pause className="h-4 w-4" />
                Pause
              </Button>
            )}
            <Button 
              onClick={handleStop} 
              variant="destructive" 
              disabled={!isRunning && time === 0}
              className="flex items-center gap-2"
            >
              <Square className="h-4 w-4" />
              Stop
            </Button>
          </div>
          {time > 0 && (
            <div className="text-sm text-gray-600">
              Total study time: {Math.floor(time / 60)} minutes
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
