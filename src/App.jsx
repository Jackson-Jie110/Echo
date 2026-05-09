import { startTransition, useEffect, useState } from 'react';
import './styles/theme.css';
import { QUADRANT_ORDER } from './features/echo/constants';
import { createInitialLetters, createInitialMoods, createInitialQuadrants } from './features/echo/data';
import { AppFrame } from './features/echo/components/AppFrame';
import { TabBar } from './features/echo/components/TabBar';
import { EchoScreen } from './features/echo/screens/EchoScreen';
import { HomeScreen } from './features/echo/screens/HomeScreen';
import { LightScreen } from './features/echo/screens/LightScreen';
import { MyScreen } from './features/echo/screens/MyScreen';
import { TodayScreen } from './features/echo/screens/TodayScreen';
import { CalendarSheet } from './features/echo/overlays/CalendarSheet';
import { FocusMode } from './features/echo/overlays/FocusMode';
import { LetterDetailSheet } from './features/echo/overlays/LetterDetailSheet';
import { QuadrantSheet } from './features/echo/overlays/QuadrantSheet';
import { QuickAddSheet } from './features/echo/overlays/QuickAddSheet';
import { SheetBackdrop } from './features/echo/overlays/SheetBackdrop';
import {
  detectEmotion,
  formatLetterDate,
  formatMoodTimestamp,
  getAiReply,
  getEnergyModel,
  getTimeRemaining,
  matchesLetterFilter,
  moveMonth,
  startOfMonth,
  toDateKey,
} from './features/echo/utils';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [energy, setEnergy] = useState(56);
  const [quadrants, setQuadrants] = useState(() => createInitialQuadrants());
  const [openQuadrantId, setOpenQuadrantId] = useState(null);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [showTodayCalendar, setShowTodayCalendar] = useState(false);
  const [todayCalendarMonth, setTodayCalendarMonth] = useState(() => startOfMonth(new Date()));
  const [draftTaskName, setDraftTaskName] = useState('');
  const [draftTaskDate, setDraftTaskDate] = useState('');
  const [draftTaskTime, setDraftTaskTime] = useState('');
  const [draftQuadrantId, setDraftQuadrantId] = useState('important-not-urgent');
  const [focusTarget, setFocusTarget] = useState(null);
  const [focusNow, setFocusNow] = useState(() => new Date());
  const [moods, setMoods] = useState(() => createInitialMoods());
  const [composerOpen, setComposerOpen] = useState(false);
  const [moodDraft, setMoodDraft] = useState('');
  const [aiTyping, setAiTyping] = useState(false);
  const [echoFilter, setEchoFilter] = useState('all');
  const [letters, setLetters] = useState(() => createInitialLetters());
  const [openLetterId, setOpenLetterId] = useState(null);
  const [showEchoCalendar, setShowEchoCalendar] = useState(false);
  const [echoCalendarMonth, setEchoCalendarMonth] = useState(() => startOfMonth(new Date()));
  const [pendingEntry, setPendingEntry] = useState(null);

  useEffect(() => {
    if (!focusTarget) {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setFocusNow(new Date());
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [focusTarget]);

  const allTasks = QUADRANT_ORDER.flatMap((quadrantId) => quadrants[quadrantId].tasks);
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter((task) => task.completed).length;
  const completionRatio = totalTasks > 0 ? completedTasks / totalTasks : 0;
  const latestMoodToday = moods.find((item) => formatMoodTimestamp(item.createdAt).startsWith('今天'));
  const selectedQuadrant = openQuadrantId ? quadrants[openQuadrantId] : null;
  const selectedLetter = letters.find((letter) => letter.id === openLetterId) ?? null;
  const focusTask = focusTarget
    ? quadrants[focusTarget.quadrantId].tasks.find((task) => task.id === focusTarget.taskId) ?? null
    : null;
  const filteredLetters = letters.filter((letter) => matchesLetterFilter(letter, echoFilter));
  const energyModel = getEnergyModel(energy);
  const taskMarkedDates = allTasks.filter((task) => task.deadline).map((task) => toDateKey(task.deadline));
  const letterMarkedDates = letters.map((letter) => toDateKey(letter.date));
  const focusCountdown = focusTask ? getTimeRemaining(focusTask.deadline, focusNow) : null;
  const unreadLetters = letters.filter((letter) => !letter.read).length;

  const renderedMoods = moods.map((mood) => ({
    ...mood,
    timestampLabel: formatMoodTimestamp(mood.createdAt),
  }));

  const renderedLetters = filteredLetters.map((letter) => ({
    ...letter,
    dateLabel: formatLetterDate(letter.date),
  }));

  const renderedSelectedLetter = selectedLetter
    ? {
        ...selectedLetter,
        dateLabel: formatLetterDate(selectedLetter.date),
      }
    : null;

  function navigateTo(targetScreen) {
    startTransition(() => {
      setScreen(targetScreen);
    });
  }

  function showHome() {
    setOpenQuadrantId(null);
    setShowQuickAdd(false);
    setComposerOpen(false);
    setShowTodayCalendar(false);
    setShowEchoCalendar(false);
    setFocusTarget(null);
    setOpenLetterId(null);
    navigateTo('home');
  }

  function openFromHome(targetScreen) {
    setPendingEntry(targetScreen);
    window.setTimeout(() => {
      navigateTo(targetScreen);
      setPendingEntry(null);
    }, 150);
  }

  function handleAddTask() {
    const name = draftTaskName.trim();

    if (!name) {
      return;
    }

    const deadline =
      draftTaskDate && draftTaskTime
        ? new Date(`${draftTaskDate}T${draftTaskTime}:00`)
        : draftTaskDate
          ? new Date(`${draftTaskDate}T20:00:00`)
          : null;

    const newTask = {
      id: crypto.randomUUID(),
      name,
      deadline,
      completed: false,
    };

    setQuadrants((currentValue) => ({
      ...currentValue,
      [draftQuadrantId]: {
        ...currentValue[draftQuadrantId],
        tasks: [newTask, ...currentValue[draftQuadrantId].tasks],
      },
    }));

    setDraftTaskName('');
    setDraftTaskDate('');
    setDraftTaskTime('');
    setDraftQuadrantId('important-not-urgent');
    setShowQuickAdd(false);
    setOpenQuadrantId(draftQuadrantId);
  }

  function markTaskDone(quadrantId, taskId) {
    setQuadrants((currentValue) => ({
      ...currentValue,
      [quadrantId]: {
        ...currentValue[quadrantId],
        tasks: currentValue[quadrantId].tasks.map((task) =>
          task.id === taskId ? { ...task, completed: true } : task,
        ),
      },
    }));
    setFocusTarget(null);
  }

  function handleSendMood() {
    const content = moodDraft.trim();

    if (!content || aiTyping) {
      return;
    }

    const emotion = detectEmotion(content);
    const draftId = crypto.randomUUID();

    setAiTyping(true);
    setComposerOpen(false);
    setMoodDraft('');
    setMoods((currentValue) => [
      {
        id: draftId,
        createdAt: new Date(),
        content,
        emotion,
        aiComment: '',
        pending: true,
      },
      ...currentValue,
    ]);

    window.setTimeout(() => {
      setMoods((currentValue) =>
        currentValue.map((item) =>
          item.id === draftId
            ? {
                ...item,
                aiComment: getAiReply(emotion),
                pending: false,
              }
            : item,
        ),
      );
      setAiTyping(false);
    }, 760);
  }

  function openLetter(letterId) {
    setLetters((currentValue) =>
      currentValue.map((letter) =>
        letter.id === letterId
          ? {
              ...letter,
              read: true,
            }
          : letter,
      ),
    );
    setOpenLetterId(letterId);
  }

  function handleEchoDatePick(dateKey) {
    const hit = letters.find((letter) => toDateKey(letter.date) === dateKey);

    if (hit) {
      openLetter(hit.id);
      setShowEchoCalendar(false);
    }
  }

  return (
    <AppFrame screen={screen} onHome={showHome}>
      <HomeScreen screen={screen} pendingEntry={pendingEntry} onOpen={openFromHome} />

      <TodayScreen
        screen={screen}
        energy={energy}
        energyModel={energyModel}
        quadrants={quadrants}
        completedTasks={completedTasks}
        totalTasks={totalTasks}
        completionRatio={completionRatio}
        latestMoodToday={latestMoodToday}
        onEnergyChange={setEnergy}
        onOpenTodayCalendar={() => setShowTodayCalendar(true)}
        onOpenQuickAdd={() => setShowQuickAdd(true)}
        onOpenQuadrant={setOpenQuadrantId}
        onNavigateLight={() => navigateTo('light')}
      />

      <LightScreen
        screen={screen}
        aiTyping={aiTyping}
        moods={renderedMoods}
        composerOpen={composerOpen}
        moodDraft={moodDraft}
        onComposerOpen={() => setComposerOpen(true)}
        onComposerClose={() => setComposerOpen(false)}
        onMoodDraftChange={setMoodDraft}
        onSendMood={handleSendMood}
      />

      <EchoScreen
        screen={screen}
        echoFilter={echoFilter}
        filteredLetters={renderedLetters}
        totalLetters={letters.length}
        unreadLetters={unreadLetters}
        onFilterChange={setEchoFilter}
        onOpenCalendar={() => setShowEchoCalendar(true)}
        onOpenLetter={openLetter}
      />

      <MyScreen screen={screen} />

      <TabBar screen={screen} onNavigate={navigateTo} />

      {openQuadrantId && selectedQuadrant && (
        <>
          <SheetBackdrop onClose={() => setOpenQuadrantId(null)} />
          <QuadrantSheet
            quadrant={selectedQuadrant}
            quadrantId={openQuadrantId}
            onClose={() => setOpenQuadrantId(null)}
            onFocusTask={setFocusTarget}
          />
        </>
      )}

      {showQuickAdd && (
        <>
          <SheetBackdrop onClose={() => setShowQuickAdd(false)} />
          <QuickAddSheet
            draftTaskName={draftTaskName}
            draftTaskDate={draftTaskDate}
            draftTaskTime={draftTaskTime}
            draftQuadrantId={draftQuadrantId}
            onTaskNameChange={setDraftTaskName}
            onTaskDateChange={setDraftTaskDate}
            onTaskTimeChange={setDraftTaskTime}
            onQuadrantChange={setDraftQuadrantId}
            onConfirm={handleAddTask}
          />
        </>
      )}

      {showTodayCalendar && (
        <>
          <SheetBackdrop onClose={() => setShowTodayCalendar(false)} />
          <CalendarSheet
            monthDate={todayCalendarMonth}
            markedDates={taskMarkedDates}
            onPrev={() => setTodayCalendarMonth(moveMonth(todayCalendarMonth, -1))}
            onNext={() => setTodayCalendarMonth(moveMonth(todayCalendarMonth, 1))}
          />
        </>
      )}

      {focusTask && focusCountdown && (
        <FocusMode
          quadrantName={quadrants[focusTarget.quadrantId].name}
          task={focusTask}
          countdown={focusCountdown}
          reminder={energyModel.reminder}
          onBack={() => setFocusTarget(null)}
          onComplete={() => markTaskDone(focusTarget.quadrantId, focusTarget.taskId)}
        />
      )}

      {showEchoCalendar && (
        <>
          <SheetBackdrop onClose={() => setShowEchoCalendar(false)} />
          <CalendarSheet
            monthDate={echoCalendarMonth}
            markedDates={letterMarkedDates}
            clickable
            onPrev={() => setEchoCalendarMonth(moveMonth(echoCalendarMonth, -1))}
            onNext={() => setEchoCalendarMonth(moveMonth(echoCalendarMonth, 1))}
            onSelectDateKey={handleEchoDatePick}
          />
        </>
      )}

      {renderedSelectedLetter && (
        <>
          <SheetBackdrop onClose={() => setOpenLetterId(null)} />
          <LetterDetailSheet letter={renderedSelectedLetter} onClose={() => setOpenLetterId(null)} />
        </>
      )}
    </AppFrame>
  );
}
