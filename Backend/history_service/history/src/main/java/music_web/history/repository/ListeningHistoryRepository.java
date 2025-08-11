package music_web.history.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import music_web.history.entity.ListeningHistory;

public interface ListeningHistoryRepository extends JpaRepository<ListeningHistory,Long> {
    List<ListeningHistory> findByUserIdOrderByListenedAtDesc(Long userId);
}
